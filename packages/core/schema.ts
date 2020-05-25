import { memo, Topology, Maybe } from "schema-runtime";
import { Apply, Tag } from "hkt";
export interface User {
  fullname: string;
  login: string;
}
export const User = memo(<T extends Tag>(t: Topology<T>): Apply<T, User> => t.interface("User", {
  fullname: t.string,
  login: t.string
}));
export interface Format {
  description: string;
}
export const Format = memo(<T extends Tag>(t: Topology<T>): Apply<T, Format> => t.interface("Format", {
  description: t.string
}));
export interface TargetAudience {
  description: string;
}
export const TargetAudience = memo(<T extends Tag>(t: Topology<T>): Apply<T, TargetAudience> => t.interface("TargetAudience", {
  description: t.string
}));
export interface Organizer {
  name: string;
  address: string;
  site: string;
  type: number;
}
export const Organizer = memo(<T extends Tag>(t: Topology<T>): Apply<T, Organizer> => t.interface("Organizer", {
  name: t.string,
  address: t.string,
  site: t.string,
  type: t.number
}));
export interface Training {
  label: string;
  name: string;
  description: string;
  format: Format;
  organizer: Organizer;
  start: string;
  end: string;
  audience: TargetAudience;
  site: string;
}
export const Training = memo(<T extends Tag>(t: Topology<T>): Apply<T, Training> => t.interface("Training", {
  label: t.string,
  name: t.string,
  description: t.string,
  format: t.ref(() => Format(t)),
  organizer: t.ref(() => Organizer(t)),
  start: t.string,
  end: t.string,
  audience: t.ref(() => TargetAudience(t)),
  site: t.string
}));
export interface Request {
  user: User;
  date: string;
  training: Training;
}
export const Request = memo(<T extends Tag>(t: Topology<T>): Apply<T, Request> => t.interface("Request", {
  user: t.ref(() => User(t)),
  date: t.string,
  training: t.ref(() => Training(t))
}));
export interface Feedback {
  user: User;
  type: number;
  training: Training;
  date: string;
  text: string;
}
export const Feedback = memo(<T extends Tag>(t: Topology<T>): Apply<T, Feedback> => t.interface("Feedback", {
  user: t.ref(() => User(t)),
  type: t.number,
  training: t.ref(() => Training(t)),
  date: t.string,
  text: t.string
}));
export interface Materials {
  training: Training;
  link: string;
}
export const Materials = memo(<T extends Tag>(t: Topology<T>): Apply<T, Materials> => t.interface("Materials", {
  training: t.ref(() => Training(t)),
  link: t.string
}));