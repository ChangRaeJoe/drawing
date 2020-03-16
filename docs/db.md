# DATABASE SCHEMA

## User
``` js
CREATE TABLE `User` (
  `id` varchar(16) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `nick` varchar(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `joinDate` date NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `email_cons` UNIQUE (`email`)
);
```

## ImgBoard
``` js
CREATE TABLE `ImgBoard` (
  `id` int(16) NOT NULL auto_increment,
  `title` varchar(40) NOT NULL,
  `context` varchar(80) NOT NULL,
  `user_id` varchar(16) NOT NULL,
  `hit` INT(11) NOT NULL DEFAULT 0,
  `imgpath` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY(`id`)
);
```

## Board
