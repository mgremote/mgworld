create table record (
  id bigint(20) primary key not null auto_increment,
  name varchar(191) not null,
  createdAt datetime not null,
  updatedAt datetime not null
);
