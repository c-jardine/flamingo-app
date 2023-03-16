import { sub } from 'date-fns';
import * as yup from 'yup';

const Message = {
  REQUIRED: 'Required',
  MIN_LENGTH: 'Not enough characters',
  MAX_LENGTH: 'Too many characters',
};

export const profileFormSchema = yup
  .object({
    first_name: yup
      .string()
      .required(Message.REQUIRED)
      .min(2, Message.MIN_LENGTH)
      .max(32, Message.MAX_LENGTH),
    last_name: yup.string().max(32, Message.MAX_LENGTH),
    birthday: yup
      .date()
      .min(sub(new Date(), { years: 100 }), 'Must be less than 100 years old')
      .max(sub(new Date(), { years: 18 }), 'Must be at least 18 years old'),
    gender: yup.string(),
    bio: yup.string().max(256, Message.MAX_LENGTH),
    website: yup.string(),
  })
  .required();

export const detailsFormSchema = yup
  .object({
    education: yup.string().max(64, Message.MAX_LENGTH),
    job_title: yup.string().max(32, Message.MAX_LENGTH),
    personality_type: yup.string().max(6, Message.MAX_LENGTH),
    political_affiliation: yup.string().max(32, Message.MAX_LENGTH),
    is_drinker: yup.boolean(),
    is_smoker: yup.boolean(),
    is_stoner: yup.boolean(),
  })
  .required();

export const amusementFormSchema = yup
  .object({
    interests: yup.string().max(215, Message.MAX_LENGTH),
    hobbies: yup.string().max(215, Message.MAX_LENGTH),
    books: yup.string().max(215, Message.MAX_LENGTH),
    movies: yup.string().max(215, Message.MAX_LENGTH),
    music: yup.string().max(215, Message.MAX_LENGTH),
    tv_shows: yup.string().max(215, Message.MAX_LENGTH),
  })
  .required();
