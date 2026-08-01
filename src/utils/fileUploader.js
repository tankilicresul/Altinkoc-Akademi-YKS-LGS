import { supabase } from '../lib/supabase';

/**
 * Converts a file selected from the computer into a Base64 data URL
 * and attempts to upload it to Supabase Storage if configured.
 */
export async function uploadMediaFile(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;

      // If Supabase is available, try uploading to Supabase Storage
      if (supabase) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `media_${Date.now()}.${fileExt}`;
          const filePath = `uploads/${fileName}`;

          const { error } = await supabase.storage
            .from('media')
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

          if (!error) {
            const { data: publicUrlData } = supabase.storage
              .from('media')
              .getPublicUrl(filePath);

            if (publicUrlData?.publicUrl) {
              resolve(publicUrlData.publicUrl);
              return;
            }
          }
        } catch (err) {
          console.warn('Supabase storage upload fallback to Base64:', err);
        }
      }

      // Fallback to Base64 Data URL (Instant local & persistent)
      resolve(base64Data);
    };

    reader.readAsDataURL(file);
  });
}
