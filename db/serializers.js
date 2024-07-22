const { Serializer, Deserializer, Error: JSONAPIError } = require('jsonapi-serializer');
const camelize = require('camelize');
const { capitalize, isEqual, uniqWith } = require('lodash');


const User = new Serializer('users', {
  attributes: [
    'name',
    'birth_date',
    'media_file',
    'role',
    'position',
  ],
  'media_file': {
    ref: 'id',
    attributes: ['name', 'path', 'type'],
  },
});

const Media = new Serializer('media', {
  attributes: ['name', 'path', 'type'],
});

const Attendance = new Serializer('attendances', {
  attributes: ['arrival_time', 'user'],
  user: {
    ref: 'id',
    attributes: ['name', 'department'],
  },
});

const Task = new Serializer('tasks', {
  attributes: ['department', 'task_number', 'deadline', 'status', 'type', 'user', 'media_file'],
  user: {
    ref: 'id',
    attributes: ['name', 'department'],
  },
  'media_file': {
    ref: 'id',
    attributes: ['name', 'path', 'type'],
  },
});


const Department = new Serializer('departments', {
  attributes: ['name', 'region']
});

const DefaultDeserializer = new Deserializer({
  keyForAttribute: 'camelCase',
});

const RELATION_NAME_TRANSLATION = {
  channel: 'telegram-channel',
  owner: 'user',
};

function relationTransform(record) {
  if (!record) {
    return null;
  }
  let json = record.toJSON ? record.toJSON() : record;

  let res = Object.keys(json).reduce((obj, key) => {
    let isIncluded = key in RELATION_NAME_TRANSLATION;
    let isRelation = key.includes('_id');
    let value = json[key];

    key = isRelation ? key.replace('_id', '') : key;
    if (value !== null) {
      if (isIncluded) {
        value = { id: value.id, type: RELATION_NAME_TRANSLATION[key] };
      } else {
        value = isRelation ? { id: value, type: RELATION_NAME_TRANSLATION[key] || key } : value;
      }
    }
    obj[camelize(key)] = value;
    return obj;
  }, {});

  return res;
}

function typeForAttribute(attribute, record) {
  return 'type' in record ? record.type : attribute;
}

const serializers = {
  User,
  Media,
  Task,
  Attendance,
  Department
};

function deserialize(models) {
  return DefaultDeserializer.deserialize(models);
}

function serialize(models, { type } = {}) {
  let isArray = Array.isArray(models);
  let model = isArray ? models[0] : models;
  let key = camelize(type || model?.constructor.name);
  let serializer = serializers[key];
  let json = serializer ? serializer.serialize(models) : { data: models };

  let nested = isArray
    ? models.map(getIncludes).reduce((sum, val) => sum.concat(...val), [])
    : getIncludes(model);

  let included = [];
  nested.forEach(val => {
    if (!val) {
      return;
    }
    let serialized = serialize(val);
    included.push(serialized.data);
    if (serialized.included) {
      included.push(...serialized.included);
    }
  });

  included = included.filter(({ type }) => type);

  if (included.length) {
    json.included = uniqWith(included, isEqual);
  }

  return json;
}

function getIncludes(model) {
  if (!model?._options) {
    return [];
  }
  let included = [];
  let { includeNames } = model._options;
  if (includeNames) {
    includeNames.forEach(function(name) {
      included = included.concat(model.get(name));
    });
  }

  return included;
}

module.exports = { ...serializers, serialize, deserialize, JSONAPIError };
