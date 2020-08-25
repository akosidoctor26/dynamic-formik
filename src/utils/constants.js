const DEFAULT_FIELD_TYPES = {
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SELECT: 'select',
  TEXT: 'text',
  TEXTAREA: 'textarea'
};

const DEFAULT_YUP_MAPPING = {
  [DEFAULT_FIELD_TYPES.TEXT]: 'string',
  [DEFAULT_FIELD_TYPES.TEXTAREA]: 'string',
  [DEFAULT_FIELD_TYPES.SELECT]: 'string',
  [DEFAULT_FIELD_TYPES.RADIO]: 'string',
  [DEFAULT_FIELD_TYPES.CHECKBOX]: 'boolean'
};

export { DEFAULT_FIELD_TYPES, DEFAULT_YUP_MAPPING };
