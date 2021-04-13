CREATE TABLE IF NOT EXISTS Dictionary
(
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    tag VARCHAR(50)  NOT NULL,
    en  VARCHAR(300) NOT NULL,
    pl  VARCHAR(300) NULL,
    CONSTRAINT `UK__Dictionary__tag` UNIQUE (tag)
);

CREATE TABLE IF NOT EXISTS Status
(
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    tag           VARCHAR(50) NOT NULL,
    dictionary_id VARCHAR(50) NOT NULL,
    is_active     BOOLEAN     NOT NULL DEFAULT 1,
    CONSTRAINT `UK__Status__tag` UNIQUE (tag)
);

CREATE TABLE IF NOT EXISTS Issue
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       VARCHAR(90)  NOT NULL,
    description VARCHAR(500) NOT NULL,
    status_id   INTEGER      NOT NULL,
    FOREIGN KEY (status_id)
        REFERENCES Status(id)
);

INSERT OR IGNORE INTO Dictionary (tag, en)
VALUES ('STATUS_OPEN', 'Open'),
       ('STATUS_CLOSED', 'Closed'),
       ('STATUS_PENDING', 'Pending'),
       ('STATUS_REMOVED', 'Removed');

INSERT OR IGNORE INTO Status (tag, dictionary_id)
VALUES ('OPEN', (SELECT id FROM Dictionary WHERE tag = 'STATUS_OPEN')),
       ('CLOSED', (SELECT id FROM Dictionary WHERE tag = 'STATUS_CLOSED')),
       ('PENDING', (SELECT id FROM Dictionary WHERE tag = 'STATUS_PENDING')),
       ('REMOVED', (SELECT id FROM Dictionary WHERE tag = 'STATUS_REMOVED')),;