CREATE TABLE systems (
    id             uuid        NOT NULL PRIMARY KEY,
    code           text        NOT NULL,
    name           text        NOT NULL,
    created_at     timestamp NOT NULL
);

CREATE TABLE roles (
    id             uuid        NOT NULL PRIMARY KEY,
    system_id      text        NOT NULL,
    name           text        not null,
    code           text        not null,
    charge         text        NOT NULL,
    created_at     timestamp NOT NULL
);

CREATE TABLE role_users (
    id             text        NOT NULL PRIMARY KEY,
    role_id        text        NOT NULL,
    created_at     timestamp   NOT NULL,
    UNIQUE (id, role_id)
);

CREATE TABLE role_groups (
    id             text        NOT NULL PRIMARY KEY,
    role_id        text        NOT NULL,
    post           integer     NOT NULL,
    created_at     timestamp   NOT NULL,
    UNIQUE (id, role_id, post)
);
