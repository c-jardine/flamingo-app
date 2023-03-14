export interface PhotoProps {
  created_at: Date;
  id: string;
  last_accessed_at: Date;
  metadata: {
    cacheControl: 'cache' | 'no-cache';
    contentLength: number;
    eTag: string;
    httpStatusCode: number;
    lastModified: Date;
    mimetype: string;
    size: number;
  };
  name: string;
  updated_at: Date;
}
