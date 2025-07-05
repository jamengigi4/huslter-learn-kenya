
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  // Parse and structure the lesson content
  const structureContent = (rawContent: string) => {
    const lines = rawContent.split('\n');
    const structuredElements: JSX.Element[] = [];
    let currentIndex = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return;

      // Main headings (titles with emojis)
      if (trimmedLine.includes('📧') || trimmedLine.includes('💼') || trimmedLine.includes('📁') || 
          trimmedLine.includes('✉️') || trimmedLine.includes('✍️') || trimmedLine.includes('⚡') ||
          trimmedLine.includes('🔍') || trimmedLine.includes('🏆') || trimmedLine.includes('🛍️') ||
          trimmedLine.includes('🤖') || trimmedLine.includes('🤝') || trimmedLine.includes('🎯')) {
        structuredElements.push(
          <h3 key={currentIndex++} className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            {trimmedLine}
          </h3>
        );
        return;
      }

      // Section headings
      if (trimmedLine.includes(':') && (trimmedLine.includes('✅') || trimmedLine.includes('❌') || 
          trimmedLine.includes('💰') || trimmedLine.includes('📝') || trimmedLine.includes('🔴') ||
          trimmedLine.includes('🟢') || trimmedLine.includes('💡') || trimmedLine.includes('⚠️'))) {
        structuredElements.push(
          <h4 key={currentIndex++} className="text-lg font-semibold text-success mt-6 mb-3">
            {trimmedLine}
          </h4>
        );
        return;
      }

      // Bullet points and lists
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.match(/^[\d]+\./)) {
        const isNumbered = trimmedLine.match(/^[\d]+\./);
        const content = trimmedLine.replace(/^[•\-]/, '').replace(/^[\d]+\./, '').trim();
        
        structuredElements.push(
          <li key={currentIndex++} className="ml-6 mb-2 text-foreground/90 leading-relaxed">
            <span className="text-primary font-medium mr-2">
              {isNumbered ? '🔢' : '🛠️'}
            </span>
            {content}
          </li>
        );
        return;
      }

      // Examples and tips
      if (trimmedLine.includes('Example') || trimmedLine.includes('Pro Tip') || 
          trimmedLine.includes('Best Practice') || trimmedLine.includes('Remember')) {
        structuredElements.push(
          <div key={currentIndex++} className="bg-success/10 border-l-4 border-success p-4 my-4 rounded-r-lg">
            <p className="text-foreground font-medium flex items-start gap-2">
              <span className="text-success">💡</span>
              {trimmedLine}
            </p>
          </div>
        );
        return;
      }

      // Regular paragraphs
      if (trimmedLine.length > 0) {
        structuredElements.push(
          <p key={currentIndex++} className="mb-4 text-foreground/90 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });

    return structuredElements;
  };

  return (
    <Card className="lesson-content">
      <CardContent className="p-6">
        <div className="prose prose-sm max-w-none">
          {structureContent(content)}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="text-primary font-semibold">⏭️ Next Step:</span>
            </p>
            <p className="text-sm text-foreground">
              Practice what you've learned and move on to the next lesson when ready!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonContent;
