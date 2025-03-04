## 啟動 docker-compose
```bash
docker-compose up -d
```
## 重啟
```bash
docker-compose restart
```


## 進入 db container
```bash
docker exec -it alan3c-monorepo-database-1 bash
docker exec -it alan3c-monorepo-database-1 sh
```

## 匯入資料庫
```bash
pg_restore \
  -U directus \
  -d directus \
  --no-owner \
  --no-privileges \
  --clean --if-exists \
  -v /tmp/20250304-alan3c.backup
```

## 進入 directus container
```bash
docker exec -it alan3c-monorepo-directus-1 sh
```