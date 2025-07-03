import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  originalSize: number;
  compressedSize: number;
}

const PhotoUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processImage = async (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      img.onload = () => {
        // Сжимаем изображение до максимум 1200px по ширине
        const maxWidth = 1200;
        const scale = Math.min(maxWidth / img.width, maxWidth / img.height);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({
                id: Date.now().toString(),
                name: file.name,
                url,
                originalSize: file.size,
                compressedSize: blob.size,
              });
            }
          },
          "image/jpeg",
          0.8,
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsProcessing(true);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (files.length === 0) {
      toast.error("Пожалуйста, выберите изображения");
      setIsProcessing(false);
      return;
    }

    try {
      const processedFiles = await Promise.all(
        files.map((file) => processImage(file)),
      );

      setUploadedFiles((prev) => [...prev, ...processedFiles]);
      toast.success(`Обработано ${processedFiles.length} изображений`);
    } catch (error) {
      toast.error("Ошибка при обработке изображений");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (files.length === 0) return;

    setIsProcessing(true);

    try {
      const processedFiles = await Promise.all(
        files.map((file) => processImage(file)),
      );

      setUploadedFiles((prev) => [...prev, ...processedFiles]);
      toast.success(`Обработано ${processedFiles.length} изображений`);
    } catch (error) {
      toast.error("Ошибка при обработке изображений");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return mb > 1 ? `${mb.toFixed(1)} МБ` : `${kb.toFixed(1)} КБ`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="p-8 border-2 border-dashed transition-all duration-300 hover:border-primary/50">
        <div
          className={`relative min-h-64 flex flex-col items-center justify-center text-center transition-all duration-300 ${
            isDragging
              ? "bg-primary/10 border-primary scale-105"
              : "bg-gradient-to-br from-purple-50 to-blue-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={48} className="text-primary" />
              </div>
              <p className="text-lg font-medium text-gray-600">
                Обрабатываю изображения...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Icon
                  name="Camera"
                  size={48}
                  className="text-primary mx-auto mb-2"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Загрузите ваши фотографии
                </h3>
              </div>

              <p className="text-gray-600 mb-6 max-w-md">
                Перетащите изображения сюда или нажмите кнопку для выбора
                файлов. Автоматически сжимаем и оптимизируем для лучшей
                производительности.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <label className="cursor-pointer">
                    <Icon name="Upload" size={20} className="mr-2" />
                    Выбрать файлы
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </Button>

                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Icon name="FolderOpen" size={20} className="mr-2" />
                  Или перетащите сюда
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Icon name="Zap" size={16} />
                  Автосжатие
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Shield" size={16} />
                  Безопасность
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Sparkles" size={16} />
                  Качество
                </span>
              </div>
            </>
          )}
        </div>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="mt-6 p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="CheckCircle" size={20} className="text-green-500" />
            Обработанные изображения ({uploadedFiles.length})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <p className="font-medium text-sm truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Было: {formatFileSize(file.originalSize)}</span>
                  <span className="text-green-600">
                    Стало: {formatFileSize(file.compressedSize)}
                  </span>
                </div>
                <div className="text-xs text-center mt-1 text-purple-600">
                  Сжато на{" "}
                  {Math.round(
                    (1 - file.compressedSize / file.originalSize) * 100,
                  )}
                  %
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PhotoUpload;
