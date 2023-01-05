package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.CartRepository;

import com.project.carpentryshop.Repo.ItemRepository;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartApi {

    private CartRepository cartRepository;
    private ItemRepository itemRepository;

    @Autowired
    public CartApi(CartRepository cartRepository, ItemRepository itemRepository) {
        this.cartRepository = cartRepository;
        this.itemRepository = itemRepository;
    }

    @GetMapping("/allCart")
    public Iterable<Cart> getAllCart() {
        return cartRepository.findAll();
    }

    @GetMapping("/all")
    public Iterable<Cart> getAll() {
        return cartRepository.findAll();

    }

    @GetMapping("/total")
    public double getTotalPrice() {
        if(cartRepository.count() != 0){
            Cart last = cartRepository.findTopByOrderByIdDesc();
            if(last.isActive() == false)
            {
                return 0;
            }
            return last.getTotalPrice();
        }
        return 0;
    }
    @PostMapping("/add")
    public ResponseEntity createCart(@RequestBody ItemCart item) {

        if(cartRepository.count() == 0) {
            Cart cart = new Cart();
            cart.setName("Cart 1");
            cart.setActive(true);
            cart.setCreationDate(LocalDate.now());
            cart.setTotalPrice(item.getElementConstant().getPricePerPiece());
            List<ItemCart> items = Arrays.asList(item);
            cart.setItemCart(items);

            item.setData(LocalDate.now());
            item.setQuantityItemCart(1);
            item.setCart(cart);
            cartRepository.save(cart);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        if(cartRepository.findTopByOrderByIdDesc().isActive() == false)
        {
            Cart cartNew = new Cart();
            cartNew.setName("Cart" + (cartRepository.count() +1));
            cartNew.setActive(true);
            cartNew.setCreationDate(LocalDate.now());
            cartNew.setTotalPrice(item.getElementConstant().getPricePerPiece());
            List<ItemCart> items = Arrays.asList(item);
            cartNew.setItemCart(items);

            item.setData(LocalDate.now());
            item.setQuantityItemCart(1);
            item.setCart(cartNew);
            cartRepository.save(cartNew);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        ElementConstant exist = item.getElementConstant();
        boolean ifexist = itemRepository.existsByElementConstantAndCart(exist, cartRepository.findTopByOrderByIdDesc());

        if(ifexist){

            Cart lastCart = cartRepository.findTopByOrderByIdDesc();
            ItemCart update = itemRepository.findByElementConstant_IdAndCart(exist.getId(), lastCart);
            update.setQuantityItemCart(update.getQuantityItemCart()+1);
            lastCart.setTotalPrice(lastCart.getTotalPrice()+update.getElementConstant().getPricePerPiece());
            itemRepository.save(update);


        }
        else{
            Cart lastCart = cartRepository.findTopByOrderByIdDesc();
            Long lastId = cartRepository.findTopByOrderByIdDesc().getId();

            lastCart.setTotalPrice(lastCart.getTotalPrice() + item.getElementConstant().getPricePerPiece());


            item.setData(LocalDate.now());
            item.setQuantityItemCart(1);
            item.setCart(cartRepository.findTopById(lastId));
            itemRepository.save(item);
        }



        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/addLiquid")
    public ResponseEntity createCart2(@RequestBody ItemCart item) {

        if(cartRepository.count() == 0) {
            Cart cart = new Cart();
            cart.setName("Cart 1");
            cart.setActive(true);
            cart.setCreationDate(LocalDate.now());
            cart.setTotalPrice(item.getElementLiquid().getPricePerLiter());
            List<ItemCart> items = Arrays.asList(item);
            cart.setItemCart(items);

            item.setData(LocalDate.now());
            item.setQuantityItemCart(1);
            item.setCart(cart);
            cartRepository.save(cart);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        if(cartRepository.findTopByOrderByIdDesc().isActive() == false)
        {
            Cart cartNew = new Cart();
            cartNew.setName("Cart" + (cartRepository.count() +1));
            cartNew.setActive(true);
            cartNew.setCreationDate(LocalDate.now());
            cartNew.setTotalPrice(item.getElementLiquid().getPricePerLiter());
            List<ItemCart> items = Arrays.asList(item);
            cartNew.setItemCart(items);

            item.setData(LocalDate.now());
            item.setQuantityItemCart(1);
            item.setCart(cartNew);
            cartRepository.save(cartNew);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        ElementLiquid exist = item.getElementLiquid();
        boolean ifexist = itemRepository.existsByElementLiquidAndCart(exist,cartRepository.findTopByOrderByIdDesc());

        if(ifexist){

            Cart lastCart = cartRepository.findTopByOrderByIdDesc();
            ItemCart update = itemRepository.findByElementLiquid_IdAndCart(exist.getId(), lastCart);
            update.setQuantityItemCart(update.getQuantityItemCart()+1);
            lastCart.setTotalPrice(lastCart.getTotalPrice()+update.getElementLiquid().getPricePerLiter());
            itemRepository.save(update);

        }
        else{
            Cart lastCart = cartRepository.findTopByOrderByIdDesc();
            Long lastId = cartRepository.findTopByOrderByIdDesc().getId();

            lastCart.setTotalPrice(lastCart.getTotalPrice() + item.getElementLiquid().getPricePerLiter());

            item.setData(LocalDate.now());
            item.setQuantityItemCart(1);
            item.setCart(cartRepository.findTopById(lastId));
            itemRepository.save(item);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/end")
    public void end() {
        Cart endCart = cartRepository.findByIsActive(true);
        if(endCart == null) {
        System.out.println("There is no Cart");
        }
        else {
            endCart.setActive(false);
            cartRepository.save(endCart);
        }
    }

    @PutMapping("/totalprice/{total}")
    public Cart updateCartTotalPlus(@PathVariable("total") double total) {

        Cart findActive = cartRepository.findByIsActive(true);
        findActive.setTotalPrice(findActive.getTotalPrice() + total);


        return cartRepository.save(findActive);
    }

    @PutMapping("/totalpriceTrash/{total}")
    public Cart updateCartTotalTrash(@PathVariable("total") double total) {

        Cart findActive = cartRepository.findByIsActive(true);
        findActive.setTotalPrice(findActive.getTotalPrice() - total);


        return cartRepository.save(findActive);
    }


    @PutMapping("/totalprice2/{total}")
    public Cart updateCartTotalMinus(@PathVariable("total") double total) {

        Cart findActive = cartRepository.findByIsActive(true);
        findActive.setTotalPrice(findActive.getTotalPrice() - total);


        return cartRepository.save(findActive);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {


        cartRepository.deleteById(id);

    }
}
