import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {PlaceInterface} from './Place';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  image: string;
  places: Array<PlaceInterface>;
};

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  image: {
    type: String,
    required: true
  },
  places: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Place'
  }],
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model('User', UserSchema);