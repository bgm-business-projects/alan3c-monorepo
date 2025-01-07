import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router, context) => {
	const { services, getSchema } = context;
	const { ItemsService, FilesService } = services;

  router.get('/:collection/:id', async (req, res, next) => {
    try {
      const { collection, id } = req.params
      const schema = await getSchema();
      const itemsService = new ItemsService(collection, {
        schema,
        // @ts-ignore
        accountability: req.accountability
      });

      // 獲取數據
      const item = await itemsService.readOne(id);
      if (!item || !item.file) {
        return res.status(404).json({ error: 'File not found' });
      }

      // 獲取文件詳細信息
      const filesService = new FilesService({
        schema,
        // @ts-ignore
        accountability: req.accountability,
      });

      const fileDetails = await filesService.readOne(item.file);

      // 更新下載次數
      const updatedCount = (item.downloadCount || 0) + 1;
      await itemsService.updateOne(id, { downloadCount: updatedCount });

      // 返回文件詳細信息
      const result = {
        success: true,
        downloadFileId: item.file,
        fileDetails: {
          id: fileDetails.id,
          filename: fileDetails.filename_download,
        },
      };
      res.json(result);
    } catch (error) {
      console.error('下載失敗：', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});
