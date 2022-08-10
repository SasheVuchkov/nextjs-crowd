import CacheManager from 'cache-manager'
import Hashes from "jshashes";

export const makeKeyHash = (new Hashes.MD5).hex;

export const memoryCache = CacheManager.caching({store: 'memory', ttl: 60*60});