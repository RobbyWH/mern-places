import mongoose from 'mongoose';
import {UserInterface} from './User';

export interface PlaceInterface {
  title: string;
  description: string;
  image: string;
  address: string;
  location: {
    lat: number,
    lng: number
  },
  creator: UserInterface;
};

const Schema = mongoose.Schema;

const PlaceSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export default mongoose.model('Place', PlaceSchema);