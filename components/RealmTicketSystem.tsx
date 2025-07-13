'use client';
import { useState } from 'react';
import { Ticket, DollarSign, Users, Calendar, Eye, Share2, Settings } from 'lucide-react';

interface RealmTicket {
  id: string;
  realmId: string;
  realmName: string;
  price: number;
  type: 'single' | 'monthly' | 'lifetime';
  description: string;
  maxVisitors?: number;
  expiresAt?: Date;
  features: string[];
  sales: number;
  revenue: number;
}

interface RealmTicketSystemProps {
  realmId?: string;
  creatorMode?: boolean;
}

export default function RealmTicketSystem({ realmId, creatorMode = false }: RealmTicketSystemProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'manage' | 'analytics'>('browse');
  
  // Mock ticket data
  const [tickets] = useState<RealmTicket[]>([
    {
      id: 'ticket-1',
      realmId: 'realm-forest',
      realmName: 'Mystical Forest Concert',
      price: 5.99,
      type: 'single',
      description: 'Experience an immersive concert in a magical forest setting',
      maxVisitors: 100,
      expiresAt: new Date('2025-08-15'),
      features: ['VR Access', 'Meet & Greet', 'Exclusive Avatar'],
      sales: 47,
      revenue: 281.53
    },
    {
      id: 'ticket-2',
      realmId: 'realm-cyber',
      realmName: 'Cyber City Tour',
      price: 2.99,
      type: 'single',
      description: 'Explore a futuristic cyberpunk metropolis',
      maxVisitors: 50,
      features: ['Guided Tour', 'Interactive Elements'],
      sales: 23,
      revenue: 68.77
    },
    {
      id: 'ticket-3',
      realmId: 'realm-museum',
      realmName: 'Digital Art Gallery',
      price: 9.99,
      type: 'monthly',
      description: 'Monthly access to rotating digital art exhibitions',
      features: ['Unlimited Access', 'Artist Talks', 'Download NFTs'],
      sales: 12,
      revenue: 119.88
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    realmName: '',
    price: '',
    type: 'single' as 'single' | 'monthly' | 'lifetime',
    description: '',
    maxVisitors: '',
    features: ['']
  });

  const handleCreateTicket = () => {
    console.log('Creating ticket:', newTicket);
    alert('🎫 Realm ticket created! Visitors can now purchase access.');
  };

  const addFeature = () => {
    setNewTicket(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewTicket(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const purchaseTicket = (ticket: RealmTicket) => {
    console.log('Purchasing ticket:', ticket);
    alert(`🎫 Purchasing ${ticket.realmName} for $${ticket.price}!`);
  };

  if (!creatorMode) {
    // Visitor View - Browse Available Tickets
    return (
      <div className="bg-gray-900 text-white rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Ticket className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Realm Tickets</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">{ticket.realmName}</h3>
                <p className="text-gray-400 text-sm mb-3">{ticket.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-bold text-green-400">
                    ${ticket.price}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    ticket.type === 'lifetime' ? 'bg-purple-600/20 text-purple-300' :
                    ticket.type === 'monthly' ? 'bg-blue-600/20 text-blue-300' :
                    'bg-green-600/20 text-green-300'
                  }`}>
                    {ticket.type}
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  {ticket.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {ticket.maxVisitors && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Users className="h-4 w-4" />
                    <span>Max {ticket.maxVisitors} visitors</span>
                  </div>
                )}

                {ticket.expiresAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Until {ticket.expiresAt.toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => purchaseTicket(ticket)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Purchase Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Creator View - Manage Tickets
  return (
    <div className="bg-gray-900 text-white rounded-xl p-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('browse')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'browse' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
          }`}
        >
          <Ticket className="h-4 w-4 inline mr-2" />
          My Tickets
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'manage' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
          }`}
        >
          <Settings className="h-4 w-4 inline mr-2" />
          Create Ticket
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'analytics' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
          }`}
        >
          <DollarSign className="h-4 w-4 inline mr-2" />
          Revenue
        </button>
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Your Realm Tickets</h3>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold">{ticket.realmName}</h4>
                <p className="text-gray-400 text-sm">${ticket.price} • {ticket.sales} sales</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                  <Eye className="h-4 w-4 inline mr-1" />
                  View
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
                  <Share2 className="h-4 w-4 inline mr-1" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Create New Ticket</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Realm Name</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Amazing Realm Experience"
                value={newTicket.realmName}
                onChange={(e) => setNewTicket(prev => ({ ...prev, realmName: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="9.99"
                value={newTicket.price}
                onChange={(e) => setNewTicket(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ticket Type</label>
              <select
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                value={newTicket.type}
                onChange={(e) => setNewTicket(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="single">Single Visit</option>
                <option value="monthly">Monthly Access</option>
                <option value="lifetime">Lifetime Access</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Visitors</label>
              <input
                type="number"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="100"
                value={newTicket.maxVisitors}
                onChange={(e) => setNewTicket(prev => ({ ...prev, maxVisitors: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
              rows={3}
              placeholder="Describe the experience visitors will have..."
              value={newTicket.description}
              onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features Included</label>
            {newTicket.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="e.g., VR Access, Exclusive Content"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                />
              </div>
            ))}
            <button
              onClick={addFeature}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              + Add Feature
            </button>
          </div>

          <button
            onClick={handleCreateTicket}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Create Ticket
          </button>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Revenue Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-bold text-green-400">
                ${tickets.reduce((sum, t) => sum + t.revenue, 0).toFixed(2)}
              </h4>
              <p className="text-gray-400 text-sm">Total Revenue</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-bold text-blue-400">
                {tickets.reduce((sum, t) => sum + t.sales, 0)}
              </h4>
              <p className="text-gray-400 text-sm">Total Sales</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-bold text-purple-400">
                ${(tickets.reduce((sum, t) => sum + t.revenue, 0) / tickets.reduce((sum, t) => sum + t.sales, 1)).toFixed(2)}
              </h4>
              <p className="text-gray-400 text-sm">Avg. Sale Price</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="font-bold mb-4">Sales by Realm</h4>
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                <span>{ticket.realmName}</span>
                <div className="text-right">
                  <div className="font-semibold">${ticket.revenue.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">{ticket.sales} sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}