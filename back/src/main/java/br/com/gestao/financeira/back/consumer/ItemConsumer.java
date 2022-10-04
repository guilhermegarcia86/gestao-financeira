package br.com.gestao.financeira.back.consumer;

import br.com.gestao.financeira.back.domain.Item;
import br.com.gestao.financeira.back.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class ItemConsumer {

    private ItemService service;

    @Autowired
    public ItemConsumer(ItemService service) {
        this.service = service;
    }

    @KafkaListener(topics = "gestao-financeira", containerFactory = "itemConcurrentKafkaListenerContainerFactory")
    public void itemListener(Item item) {
        System.out.println("Recebendo item: " + item);
        this.service.saveItem(item);
    }
}
