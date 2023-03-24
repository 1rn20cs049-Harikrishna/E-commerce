 CREATE TABLE IF NOT EXISTS `dataSets` (
    `id` CHAR(36) BINARY NOT NULL ,
    `name` VARCHAR(255) NOT NULL, 
    `pack_size` INTEGER, 
    `price` INTEGER NOT NULL, 
    `mrp` INTEGER NOT NULL, 
    `category` INTEGER NOT NULL, 
    `description` TEXT NOT NULL, 
    PRIMARY KEY (`id`)) ENGINE=InnoDB;
 

CREATE TABLE IF NOT EXISTS `mails` (
    `id` INTEGER NOT NULL auto_increment , 
    `email` BIGINT NOT NULL, 
    `otp` BIGINT NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)) ENGINE=InnoDB;

 CREATE TABLE IF NOT EXISTS `users` (
    `id` CHAR(36) BINARY NOT NULL , 
    `name` VARCHAR(255) NOT NULL, 
    `mobile` BIGINT, 
    `email` VARCHAR(255) NOT NULL, 
    `password` VARCHAR(255) NOT NULL, 
    `createdAt` DATETIME, 
    `updatedAt` DATETIME,
     PRIMARY KEY (`id`)) ENGINE=InnoDB;



 CREATE TABLE IF NOT EXISTS `addresses` (
    `id` CHAR(36) BINARY NOT NULL , 
    `state` VARCHAR(255) NOT NULL, 
    `pin` INTEGER NOT NULL, 
    `district` VARCHAR(255) NOT NULL, 
    `landmark` VARCHAR(255) NOT NULL, 
    `userId` CHAR(36) BINARY, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`) 
    ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;



 CREATE TABLE IF NOT EXISTS `orders` (
    `id` CHAR(36) BINARY NOT NULL , 
    `userId` CHAR(36) BINARY NOT NULL, 
    `productId` CHAR(36) BINARY, 
    `amount` CHAR(36) BINARY NOT NULL, 
    PRIMARY KEY (`id`)) ENGINE=InnoDB;


  CREATE TABLE IF NOT EXISTS `carts` (
   `id` INTEGER NOT NULL auto_increment ,
   `userId` CHAR(36) BINARY NOT NULL, 
   `Quantity` INTEGER DEFAULT NULL, 
   `amount` INTEGER DEFAULT NULL,
   PRIMARY KEY (`id`)) ENGINE=InnoDB;


 CREATE TABLE IF NOT EXISTS `cart_products` (
    `id` INTEGER NOT NULL auto_increment , 
    `cartId` INTEGER  NOT NULL, 
    `productId` CHAR(36) BINARY NOT NULL, 
    `Quantity` INTEGER DEFAULT 1, 
    PRIMARY KEY (`id`)) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `categories` (
   `id` INTEGER NOT NULL , 
   `cat` VARCHAR(255) NOT NULL, 
   PRIMARY KEY (`id`)) ENGINE=InnoDB;


    ALTER TABLE  `addresses` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`);
    ALTER TABLE  `orders` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`);
    ALTER TABLE  `orders` ADD FOREIGN KEY (`productId`) REFERENCES `datasets`(`id`);
    ALTER TABLE  `carts` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE;
    ALTER TABLE  `cart_products` ADD FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`);
    ALTER TABLE  `cart_products` ADD FOREIGN KEY (`productId`) REFERENCES `datasets`(`id`);
    ALTER TABLE  `datasets` ADD FOREIGN KEY (`category`) REFERENCES `categories`(`id`);


    

    INSERT INTO `categories` (`id`, `cat`) VALUES ('1', 'personal-care'),
    ('2', 'child-care'),('3', 'health-nutrition'),('4', 'medicine');
    