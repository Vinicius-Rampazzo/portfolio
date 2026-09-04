"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Award } from "lucide-react";
import type { Certification } from "@/data/types";

export const CertificationModal = ({
  certification,
  onClose,
}: {
  certification: Certification;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/88 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative bg-surface border border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
        >
          <X className="w-4 h-4 text-muted" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-lg leading-tight">
                {certification.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                <span>{certification.organization}</span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span>{certification.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="overflow-auto max-h-[calc(90vh-140px)]">
          <Image
            src={certification.image}
            alt={certification.title}
            width={800}
            height={600}
            className="w-full h-auto object-contain bg-base/50"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-muted/50">
            Pressione ESC ou clique fora para fechar
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium hover:bg-cyan-400/20 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
