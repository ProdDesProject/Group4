CREATE DATABASE messenger;

CREATE TABLE users
(
  username varchar(200) not null PRIMARY KEY
);

CREATE TABLE channels
(
  channelname varchar(200) not null PRIMARY KEY
);

create table user_channels
(
  username varchar(200) not null references users(username),
  channelname varchar(200) not null references channels(channelname),
  CONSTRAINT pk_user_channels_username_channelname PRIMARY KEY (username, channelname)
);

CREATE TABLE messages
(
  message_id uuid PRIMARY KEY,
  messagecontent varchar(200) not null,
  username varchar(200) REFERENCES users(username),
  channelname varchar(200) REFERENCES channels(channelname)
);
