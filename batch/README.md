# Batch

Projeto que busca os dados em uma planilha Google Sheets, mas pode ser adaptado para buscar em qualquer outra fonte de dados contanto que siga o contrato e envia para um tópico do Kafka, também podendo ser adaptado para qualquer outra ferramenta de menssageria conforme necessidade.

## :rocket: Tecnologia

<div align="center">

```sh
Golang Version: 1.19.1
```

![go](https://img.shields.io/badge/go-007396?&logoColor=fff&style=for-the-badge&logo=go)

![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)

</div>

## Run

É necessário haver uma instância do Kafka rodando no momento que o projeto for executado, caso prefira pode rodar a imagem Docker com o seguinte comando:

```bash
docker-compose run -d batch/cmd/docker-compose.yml
```

E após isso criar o tópico **gestao-financeira**:

```bash
docker exec broker \
kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic gestao-financeira
```

Para rodar o projeto basta executar o seguinte comando:

```bash
go run batch/cmd/main.go
```