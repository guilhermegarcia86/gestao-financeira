package br.com.gestao.financeira.back.service;

import br.com.gestao.financeira.back.adapters.ItemRepository;
import br.com.gestao.financeira.back.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item saveItem(Item item) {
        Item itemSaved = this.itemRepository.save(item);
        return itemSaved;
    }

    public List<Item> findAllItems() {
        return this.itemRepository.findAll();
    }
}
