package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.Cart;
import com.project.carpentryshop.entity.ElementConstant;
import com.project.carpentryshop.entity.ElementLiquid;
import com.project.carpentryshop.entity.ItemCart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends CrudRepository<ItemCart, Long> {

    boolean existsByElementConstantAndCart(ElementConstant exist, Cart a);

    ItemCart findByElementConstant_IdAndCart(Long id, Cart lastCart);

    boolean existsByElementLiquidAndCart(ElementLiquid exist, Cart a );

    ItemCart findByElementLiquid_IdAndCart(Long id, Cart lastCart);

    ItemCart findTopByOrderByCartDesc();

    List<ItemCart> findByCart(Cart cart);
}
