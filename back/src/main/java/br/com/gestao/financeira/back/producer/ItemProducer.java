package br.com.gestao.financeira.back.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import br.com.gestao.financeira.back.domain.Item;

@Component
public class ItemProducer {

    @Autowired
    private KafkaTemplate<String, Item> kafkaTemplate;
    
    public void sendMessage(Item item) {
        kafkaTemplate.send("email-notification", item);
    }
}
