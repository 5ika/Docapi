#!/bin/bash
cd tls
openssl genrsa -out docapi-key.pem 2048
openssl req -new -sha256 -key docapi-key.pem -out docapi-csr.pem -days 1000
openssl x509 -req -in docapi-csr.pem -signkey docapi-key.pem -out docapi-cert.pem -days 1000
rm docapi-csr.pem
echo "TLS certificate has been generated"
