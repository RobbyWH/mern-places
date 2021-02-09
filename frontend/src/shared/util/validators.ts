
export enum ValidatorType {
  VALIDATOR_TYPE_REQUIRE = 'REQUIRE',
  VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH',
  VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH',
  VALIDATOR_TYPE_MIN = 'MIN',
  VALIDATOR_TYPE_MAX = 'MAX',
  VALIDATOR_TYPE_EMAIL = 'EMAIL',
  VALIDATOR_TYPE_FILE = 'FILE'
};

export const VALIDATOR_REQUIRE = () => ({ type: ValidatorType.VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: ValidatorType.VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: ValidatorType.VALIDATOR_TYPE_MINLENGTH,
  val
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: ValidatorType.VALIDATOR_TYPE_MAXLENGTH,
  val,
});
export const VALIDATOR_MIN = (val: string) => ({ type: ValidatorType.VALIDATOR_TYPE_MIN, val });
export const VALIDATOR_MAX = (val: string) => ({ type: ValidatorType.VALIDATOR_TYPE_MAX, val });
export const VALIDATOR_EMAIL = () => ({ type: ValidatorType.VALIDATOR_TYPE_EMAIL });


interface Validator {
  type: ValidatorType;
  val?: string | number;
};

export type Validators = Array<Validator>;

export const validate = (value: string | number, validators: Validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === ValidatorType.VALIDATOR_TYPE_REQUIRE && typeof value === 'string') {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === ValidatorType.VALIDATOR_TYPE_MINLENGTH && typeof value === 'string') {
      isValid = isValid && value.trim().length >= (validator.val ?? 0);
    }
    if (validator.type === ValidatorType.VALIDATOR_TYPE_MAXLENGTH && typeof value === 'string') {
      isValid = isValid && value.trim().length <= (validator.val ?? 0);
    }
    if (validator.type === ValidatorType.VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= (validator.val ?? 0);
    }
    if (validator.type === ValidatorType.VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= (validator.val ?? 0);
    }
    if (validator.type === ValidatorType.VALIDATOR_TYPE_EMAIL && typeof value === 'string') {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
