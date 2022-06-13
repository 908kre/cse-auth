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
    id             uuid        NOT NULL PRIMARY KEY,
    role_id        text        NOT NULL,
    company_code   text        NOT NULL,
    user_code      text        NOT NULL,
    division_id    text        NOT NULL,
    post           integer     NOT NULL,
    created_at     timestamp   NOT NULL
);

