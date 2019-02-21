create table user (
  id         bigint(20) primary key auto_increment not null,
  username   varchar(191) unique,
  first_name varchar(191),
  last_name  varchar(191),
  email      varchar(191),
  created_at datetime not null,
  updated_at datetime not null
);
