import { PREFAB_TEMPLATES } from '@/lib/config';

export interface AIGenerationRequest {
  prompt: string;
  userId: string;
  canvasSize: { width: number; height: number };
  existingObjects?: any[];
}

export interface GeneratedObject {
  type: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  reasoning?: string;
}

export class IntelligentBuilder {
  
  static analyzePrompt(prompt: string): {
    theme: string;
    elements: string[];
    mood: string;
    complexity: 'simple' | 'medium' | 'complex';
  } {
    const lowerPrompt = prompt.toLowerCase();
    
    // Detect theme
    let theme = 'generic';
    if (lowerPrompt.includes('forest') || lowerPrompt.includes('nature') || lowerPrompt.includes('tree')) {
      theme = 'forest';
    } else if (lowerPrompt.includes('cyber') || lowerPrompt.includes('neon') || lowerPrompt.includes('futuristic')) {
      theme = 'cyberpunk';
    } else if (lowerPrompt.includes('floating') || lowerPrompt.includes('sky') || lowerPrompt.includes('crystal')) {
      theme = 'mystical';
    }

    // Extract elements
    const elements = [];
    const elementKeywords = {
      'tree': ['tree', 'forest', 'woodland'],
      'crystal': ['crystal', 'gem', 'magical', 'glowing'],
      'portal': ['portal', 'gateway', 'teleport', 'entrance'],
      'house': ['house', 'building', 'structure', 'home'],
      'tower': ['tower', 'skyscraper', 'tall', 'spire'],
      'rock': ['rock', 'stone', 'boulder', 'mountain']
    };

    for (const [element, keywords] of Object.entries(elementKeywords)) {
      if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
        elements.push(element);
      }
    }

    // Detect mood
    let mood = 'neutral';
    if (lowerPrompt.includes('dark') || lowerPrompt.includes('scary') || lowerPrompt.includes('evil')) {
      mood = 'dark';
    } else if (lowerPrompt.includes('bright') || lowerPrompt.includes('happy') || lowerPrompt.includes('peaceful')) {
      mood = 'bright';
    } else if (lowerPrompt.includes('mysterious') || lowerPrompt.includes('mystical')) {
      mood = 'mysterious';
    }

    // Determine complexity
    const wordCount = prompt.split(' ').length;
    let complexity: 'simple' | 'medium' | 'complex' = 'simple';
    if (wordCount > 10) complexity = 'medium';
    if (wordCount > 20 || elements.length > 3) complexity = 'complex';

    return { theme, elements, mood, complexity };
  }

  static generateFromPrompt(request: AIGenerationRequest): GeneratedObject[] {
    const analysis = this.analyzePrompt(request.prompt);
    const objects: GeneratedObject[] = [];

    console.log('AI Analysis:', analysis);

    // Use template if theme matches
    const templateKey = `${analysis.theme === 'forest' ? 'starter-forest' : 
                        analysis.theme === 'cyberpunk' ? 'cyber-city' : 
                        analysis.theme === 'mystical' ? 'floating-sanctuary' : 
                        'starter-forest'}` as keyof typeof PREFAB_TEMPLATES;

    if (PREFAB_TEMPLATES[templateKey]) {
      const template = PREFAB_TEMPLATES[templateKey];
      return template.objects.map(obj => ({
        ...obj,
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        reasoning: `Generated from template: ${template.name}`
      }));
    }

    // Fallback: Generate based on detected elements
    const { width, height } = request.canvasSize;
    const centerX = width / 2;
    const centerY = height / 2;

    if (analysis.elements.length === 0) {
      // Default scene
      analysis.elements.push('tree', 'rock');
    }

    analysis.elements.forEach((element, index) => {
      const angle = (index * (360 / analysis.elements.length)) * (Math.PI / 180);
      const radius = Math.min(width, height) * 0.2;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      const colors = {
        tree: analysis.mood === 'dark' ? '#1f4d1f' : '#22c55e',
        crystal: analysis.mood === 'dark' ? '#4c1d95' : '#06b6d4',
        portal: '#8b5cf6',
        house: analysis.mood === 'dark' ? '#8b4513' : '#f59e0b',
        tower: analysis.mood === 'dark' ? '#7f1d1d' : '#ef4444',
        rock: '#6b7280'
      };

      objects.push({
        type: element,
        x: Math.max(20, Math.min(width - 20, x)),
        y: Math.max(20, Math.min(height - 20, y)),
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        color: colors[element as keyof typeof colors] || '#6b7280',
        reasoning: `Placed ${element} based on prompt analysis`
      });
    });

    // Add some random variation for complex prompts
    if (analysis.complexity === 'complex') {
      const extraElements = ['crystal', 'rock'];
      extraElements.forEach(element => {
        objects.push({
          type: element,
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height - 40) + 20,
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.3,
          color: analysis.mood === 'dark' ? '#4c1d95' : '#06b6d4',
          reasoning: 'Added for scene complexity'
        });
      });
    }

    return objects;
  }

  static generateSuggestions(currentObjects: any[], canvasSize: { width: number; height: number }): string[] {
    const suggestions = [];
    const objectTypes = currentObjects.map(obj => obj.type);
    const count = currentObjects.length;

    if (count === 0) {
      suggestions.push(
        "Create a mystical forest with glowing trees",
        "Build a cyberpunk cityscape with neon towers",
        "Design a floating crystal sanctuary"
      );
    } else if (count < 3) {
      if (!objectTypes.includes('portal')) {
        suggestions.push("Add a portal to connect realms");
      }
      if (!objectTypes.includes('crystal')) {
        suggestions.push("Place magical crystals for ambiance");
      }
      suggestions.push("Add more trees to create a forest");
    } else {
      suggestions.push(
        "Create atmospheric lighting effects",
        "Add sound zones for immersion",
        "Design quest objectives for players"
      );
    }

    return suggestions.slice(0, 4); // Return max 4 suggestions
  }

  static improveLayout(objects: any[], canvasSize: { width: number; height: number }): any[] {
    // Simple layout improvement algorithm
    const improved = [...objects];
    const { width, height } = canvasSize;

    // Ensure objects don't overlap too much
    for (let i = 0; i < improved.length; i++) {
      for (let j = i + 1; j < improved.length; j++) {
        const obj1 = improved[i];
        const obj2 = improved[j];
        
        const distance = Math.sqrt(
          Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
        );

        if (distance < 50) { // Too close
          const angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
          obj2.x = obj1.x + Math.cos(angle) * 60;
          obj2.y = obj1.y + Math.sin(angle) * 60;
          
          // Keep within bounds
          obj2.x = Math.max(20, Math.min(width - 20, obj2.x));
          obj2.y = Math.max(20, Math.min(height - 20, obj2.y));
        }
      }
    }

    return improved;
  }
}