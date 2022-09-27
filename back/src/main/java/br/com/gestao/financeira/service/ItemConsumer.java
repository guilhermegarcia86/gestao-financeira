package br.com.gestao.financeira.service;

import br.com.gestao.financeira.domain.Item;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class ItemConsumer {

    @Inject
    ItemService service;

    @Incoming("gestao-financeira")
    @Transactional
    public void consume(ConsumerRecord<String, Item> record) {
        String key = record.key();
        Item value = record.value();
        System.out.println("Key: " + key + " - " + " value: " + value);
        service.saveItem(value);
    }
}
