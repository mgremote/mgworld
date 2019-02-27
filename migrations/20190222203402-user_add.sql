ALTER TABLE user
ADD (
    password varchar(256),
    is_admin boolean default false
);