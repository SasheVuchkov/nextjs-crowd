import CacheManager from 'cache-manager'
import Hashes from "jshashes";

export const getKeyHasher = new Hashes.MD5

const memoryCache = CacheManager.caching({store: 'memory', max: 500000, ttl: parseInt(process.env.SIMPLE_CACHING_TTL as string)})
export default memoryCache