package br.com.gestao.financeira.back.adapters;

import br.com.gestao.financeira.back.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {

    @Query("SELECT i FROM Item i WHERE i.id = :id")
    Optional<Item> findById(UUID id);
    List<Item> findByMes(String mes);
}
