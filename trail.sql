DELIMITER $$   
CREATE TRIGGER update_cart AFTER INSERT,DELETE,UPDATE ON cart_products  + 
        FOR EACH ROW
        BEGIN  
        UPDATE carts SET Quantity = (
           select SUM(cp.Quantity) from cart_products cp,carts c where c.id= cp.cartId ),
           SET amount = (
            select (SUM(cp.Quantity)*count(cp.productId)) from cart_products  cp1,carts c1,products p where c1.id= cp1.cartId and p.id = cp1.productId group by cp1.productId ) 
            END$$  ;




            select (SUM(cp1.Quantity)*count(cp1.productId)) from cart_products  cp1,carts c1,datasets p where c1.id= cp1.cartId and p.id = cp1.productId group by cp1.productId ;



            select ((cp1.Quantity)*p.price) from cart_products  cp1,carts c1,datasets p where c1.id= cp1.cartId and p.id = cp1.productId group by cp1.productId ;


       CREATE VIEW  FINDING_AMOUNT AS select (sum(cp1.Quantity)*p.price) as indivualamount from cart_products  cp1,carts c1,datasets p where c1.id= cp1.cartId and p.id = cp1.productId group by cp1.productId ;
       
       SELECT SUM(amount) from FINDING_AMOUNT;
        


         DROP VIEW FINDING_AMOUNT;
       CREATE VIEW  FINDING_AMOUNT AS select (sum(cp1.Quantity)*p.price) as individualamount from cart_products  cp1,carts c1,datasets p where c1.id= cp1.cartId and p.id = cp1.productId group by cp1.productId ;
       
    UPDATE carts as c SET c.amount = (SELECT sum(individualamount)  from FINDING_AMOUNT f,cart_products cp where c.id=cp.CartId  ) ;
     




         DROP VIEW FINDING_AMOUNT;
       CREATE VIEW  FINDING_AMOUNT AS select (sum(cp1.Quantity)*p.price) as individualamount from cart_products  cp1,carts c1,datasets p where c1.id= cp1.cartId and p.id = cp1.productId group by cp1.productId ;
       
    UPDATE carts as c SET c.amount = (SELECT sum(individualamount)  from FINDING_AMOUNT f,cart_products cp where c.id=cp.CartId  ) ;
     
        