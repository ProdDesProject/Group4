CREATE DATABASE messenger;

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  username varchar(100) not null
);

CREATE TABLE channels
(
  channel_id SERIAL PRIMARY KEY,
  channelname varchar(100) not null
);

create table user_channels
(
  user_id integer not null references users(user_id),
  channel_id integer not null references channels(channel_id),
  CONSTRAINT pk_user_channels_user_id_channel_id PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE messages
(
  message_id SERIAL PRIMARY KEY,
  messagecontent varchar(100) not null,
  user_id integer REFERENCES users(user_id),
  channel_id integer REFERENCES channels(channel_id)
);
