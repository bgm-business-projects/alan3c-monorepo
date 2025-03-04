docker exec -it alan3c-monorepo-database-1 pg_restore \
  -U directus \
  -d directus \
  --no-owner \
  --no-privileges \
  --clean --if-exists \
  -v /tmp/20250304-alan3c.backup
