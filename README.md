## 啟動 docker-compose
```bash
docker-compose up -d
```
## 重啟
```bash
docker-compose restart
```


## 停止
```bash
docker-compose down
```

## 刪除全部 image 跟 volume 還有 container
```bash
docker-compose down --rmi all --volumes
```

## 進入 db container
```bash
docker exec -it alan3c-monorepo-database-1 bash
docker exec -it alan3c-monorepo-database-1 sh
```


## 離開
```bash
exit
```

## 匯入資料庫
```bash
pg_restore -U directus -d directus --no-owner --no-privileges --clean --if-exists -v /tmp/20250304-alan3c.backup
```

## 進入 directus container
```bash
docker exec -it alan3c-monorepo-directus-1 sh
```


## 更新專案
```bash
### 1. **去 github 更新專案**
```sh
git pull
```
### 2. **關閉並移除容器**
```sh
docker-compose down
```
這會關閉並移除 `docker-compose` 啟動的所有容器。

---

### 3. **刪除已建置的 Docker 映像檔**
```sh
docker images
```
這會列出所有的 Docker 映像檔，你可以找到對應的 `IMAGE ID` 或 `REPOSITORY` 名稱。

然後執行：
```sh
docker rmi <image_id>
```