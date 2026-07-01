#!/bin/bash
set -e

echo "==> Namespace"
kubectl apply -f namespace.yml

echo "==> ConfigMap"
kubectl apply -f config-map.yml

echo "==> Secret"
kubectl apply -f secret.yml

echo "==> MongoDB Service (Headless)"
kubectl apply -f mongodb-service.yml

echo "==> MongoDB StatefulSet"
kubectl apply -f mongodb-statfulset.yml

echo "==> Waiting for MongoDB..."
kubectl rollout status statefulset/mongodb -n thinkify --timeout=120s

echo "==> PVC"
kubectl apply -f pvc.yml

echo "==> Server Deployment"
kubectl apply -f server-deployment.yml

echo "==> Server Service"
kubectl apply -f server-service.yml

echo "==> Waiting for Server..."
kubectl rollout status deployment/server -n thinkify --timeout=60s

echo "==> Client Deployment"
kubectl apply -f client-deployment.yml

echo "==> Client Service"
kubectl apply -f client-service.yml

echo "==> Ingress"
kubectl apply -f ingress.yml

echo ""
echo "Done. App: http://51.20.77.21"
echo "Pods:    kubectl get pods -n thinkify"
echo "Ingress: kubectl get ingress -n thinkify"
