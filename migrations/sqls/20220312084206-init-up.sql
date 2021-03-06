CREATE TABLE systems (
    id             text        NOT NULL PRIMARY KEY,
    name           text        NOT NULL,
    created_at     timestamp NOT NULL
);

CREATE TABLE roles (
    id             text        NOT NULL PRIMARY KEY,
    name           text        NOT NULL,
    system_id      text        NOT NULL,
    created_at     timestamp NOT NULL,
    UNIQUE (name, system_id)
);

CREATE TABLE role_users (
    user_id        text        NOT NULL,
    role_id        text        NOT NULL,
    created_at     timestamp   NOT NULL,
    UNIQUE (user_id, role_id)
);

CREATE TABLE role_groups (
    group_id       text        NOT NULL,
    role_id        text        NOT NULL,
    post           text        NOT NULL,
    created_at     timestamp   NOT NULL,
    UNIQUE (group_id, role_id, post)
);


CREATE TABLE owners (
    id       text     NOT NULL PRIMARY KEY
);

CREATE TABLE maintainers (
    id              text     NOT NULL,
    system_id       text     NOT NULL,
    UNIQUE (id, system_id)
);
