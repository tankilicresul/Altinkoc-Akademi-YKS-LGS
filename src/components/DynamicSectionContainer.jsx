import React, { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/AuthContext';
import DynamicBlock from './DynamicBlock';
import AddBlockModal from './AddBlockModal';
import { Plus } from 'lucide-react';

export default function DynamicSectionContainer({ sectionId, defaultBlocks = [] }) {
  const { siteConfig, updateConfigValue, editMode } = useSiteConfig();
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Path in siteConfig e.g., 'customBlocks.hero'
  const configPath = `customBlocks.${sectionId}`;
  const blocks = siteConfig?.customBlocks?.[sectionId] || defaultBlocks;

  const handleUpdateBlock = (index, updatedBlock) => {
    const updated = [...blocks];
    updated[index] = updatedBlock;
    updateConfigValue(configPath, updated);
  };

  const handleDeleteBlock = (index) => {
    const updated = blocks.filter((_, i) => i !== index);
    updateConfigValue(configPath, updated);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...blocks];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    updateConfigValue(configPath, updated);
  };

  const handleMoveDown = (index) => {
    if (index === blocks.length - 1) return;
    const updated = [...blocks];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    updateConfigValue(configPath, updated);
  };

  const handleAddBlock = (newBlock) => {
    const updated = [...blocks, newBlock];
    updateConfigValue(configPath, updated);
  };

  return (
    <div className="space-y-4 relative">
      {blocks.map((block, index) => (
        <DynamicBlock
          key={block.id || index}
          block={block}
          onUpdate={(updated) => handleUpdateBlock(index, updated)}
          onDelete={() => handleDeleteBlock(index)}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
          isFirst={index === 0}
          isLast={index === blocks.length - 1}
        />
      ))}

      {/* Add New Block Button for Admin Edit Mode */}
      {isAdmin && editMode && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs shadow-md border-2 border-amber-500 hover:scale-105 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>➕ Buraya Yeni Görsel, Video, Buton veya Metin Ekle</span>
          </button>
        </div>
      )}

      {/* Modal */}
      <AddBlockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBlock={handleAddBlock}
      />
    </div>
  );
}
