import { useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../../utils/handleAxiosError";
import { Client } from '../types/ClientList';
import { Request } from '../types/Request';
import { Messages } from '../types/Message';

export function useGetItems() {
  const [photos, setPhotos] = useState<any>();
  const [requests, setRequests] = useState<Request[]>([]);
  const [markerIds, setMarkerIDs] = useState<number[] | undefined>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [messages, setMessages] = useState<Messages[] | null>(null); // Define messages consistently as Messages[] or null
  const [error, setError] = useState<string | null>(null);

  
  const checkAccounts = async (
    target: string,
    username?: string,
    password?: string,
    UserID?: number,
  ): Promise<boolean> => {
    try {
      switch (target) {
        case 'admin': {
          const adminResponse = await axios.get(`https://express-production-ac91.up.railway.app/admin/getAdmin`, {
            headers: { 'Content-Type': 'application/json' },
            params: { username, password },
          });
  
          if (adminResponse.status === 200) {
            console.log('Admin authenticated:', adminResponse.data);
            return true;
          } else {
            setError?.('Invalid username or password');
            return false;
          }
        }
  
        case 'clients': {
          try {
            const response = await axios.get<Client[]>('https://express-production-ac91.up.railway.app/user/getUserList', {
              params: { limit: 20, offset: 0 }, // Fetch 20 users at a time
            });
  
            setClients?.(response.data);
            console.log('Fetched clients:', response.data);
  
            return true;
          } catch (error) {
            const message = handleAxiosError(error);
            setError?.(message || 'Error fetching clients.');
            return false;
          }
        }
  
        case 'messages': {
          try {
            const messagesResponse = await axios.get<Messages[]>('https://express-production-ac91.up.railway.app/messaging/getMessage');
  
            setMessages?.(messagesResponse.data);
            console.log('Messages:', messagesResponse.data);
            setError?.(null);
  
            return true;
          } catch (error) {
            const message = handleAxiosError(error);
            setError?.(message || 'Error fetching messages.');
            return false;
          }
        }
  
        case 'photos': {
          if (!UserID) {
            setError?.('UserID is required to fetch photos.');
            return false;
          }
        
          try {
            const photoResponse = await axios.get<{ image1: string, image2: string, image3: string }>(
              `https://express-production-ac91.up.railway.app/photo/images/${UserID}`
            );
        
            console.log(`📸 Raw Photos for UserID ${UserID}:`, photoResponse.data);
        
            if (!photoResponse.data) {
              setError?.('Invalid photo response format.');
              return false;
            }
        
            const { image1, image2, image3 } = photoResponse.data;
        
            console.log(`✅ Extracted Images:`, { image1, image2, image3 });
        
            setPhotos((prev: any[]) => {
              if (!Array.isArray(prev)) {
                console.log("⚠️ Previous state was not an array, initializing.");
                return [{ UserID, image1, image2, image3 }];
              }
        
              const updatedPhotos = prev.map((photo) =>
                photo.UserID === UserID
                  ? { ...photo, image1, image2, image3 }
                  : photo
              );
        
              // If UserID was not found, add a new entry
              if (!prev.some((photo) => photo.UserID === UserID)) {
                console.log("➕ Adding new photo entry.");
                updatedPhotos.push({ UserID, image1, image2, image3 });
              }
        
              console.log("🖼️ Updated Photos:", updatedPhotos);
              return updatedPhotos;
            });
        
            setError?.(null);
            return true;
          } catch (error) {
            const message = handleAxiosError(error);
            setError?.(message || 'Error fetching photos.');
            return false;
          }
        }
        
        
        
  
        default:
          setError?.('Invalid target.');
          return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError?.('Invalid username or password');
      } else {
        const message = handleAxiosError(error);
        setError?.(message || 'An error occurred while fetching data.');
      }
      return false;
    }
  };
  

  return {
    error,
    requests,
    clients,
    checkAccounts,
    markerIds,
    messages,
    photos,
    setPhotos,
  };
}
