import { useState } from 'react';
import { BarChart3, Users, MapPin, TrendingUp, DollarSign, Heart, Repeat, MessageCircle } from 'lucide-react';
import { mockInsights, subscriptionPlans } from '../data/mockData';

export default function InsightsPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const maxPlays = Math.max(...mockInsights.dailyPlays.map(d => d.plays));

  return (
    <div className="insights-page">
      <h1>Статистика (Insights)</h1>
      
      <div className="insights-tabs">
        <button 
          className={`tab ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          <BarChart3 size={18} /> Обзор
        </button>
        <button 
          className={`tab ${selectedTab === 'fans' ? 'active' : ''}`}
          onClick={() => setSelectedTab('fans')}
        >
          <Users size={18} /> Топ фанаты
        </button>
        <button 
          className={`tab ${selectedTab === 'locations' ? 'active' : ''}`}
          onClick={() => setSelectedTab('locations')}
        >
          <MapPin size={18} /> География
        </button>
        <button 
          className={`tab ${selectedTab === 'sources' ? 'active' : ''}`}
          onClick={() => setSelectedTab('sources')}
        >
          <TrendingUp size={18} /> Источники
        </button>
      </div>

      {selectedTab === 'overview' && (
        <>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon plays">
                <BarChart3 size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-value">{mockInsights.totalPlays.toLocaleString()}</span>
                <span className="metric-label">Прослушиваний</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon likes">
                <Heart size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-value">{mockInsights.totalLikes.toLocaleString()}</span>
                <span className="metric-label">Лайков</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon comments">
                <MessageCircle size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-value">{mockInsights.totalComments}</span>
                <span className="metric-label">Комментариев</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon reposts">
                <Repeat size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-value">{mockInsights.totalReposts.toLocaleString()}</span>
                <span className="metric-label">Репостов</span>
              </div>
            </div>
          </div>

          <section className="chart-section">
            <h2>Динамика прослушиваний (30 дней)</h2>
            <div className="bar-chart">
              {mockInsights.dailyPlays.map((day, index) => (
                <div key={index} className="bar-container">
                  <div 
                    className="bar" 
                    style={{ height: `${(day.plays / maxPlays) * 200}px` }}
                    title={`${day.date}: ${day.plays} прослушиваний`}
                  />
                  {index % 5 === 0 && (
                    <span className="bar-label">
                      {new Date(day.date).getDate()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {selectedTab === 'fans' && (
        <section className="top-fans">
          <h2>Топ фанаты</h2>
          <div className="fans-list">
            {mockInsights.topFans.map((fan, index) => (
              <div key={fan.userId} className="fan-item">
                <span className="fan-rank">#{index + 1}</span>
                <div className="fan-avatar">{fan.username.charAt(0)}</div>
                <div className="fan-info">
                  <h3>{fan.username}</h3>
                  <p>{fan.plays} прослушиваний</p>
                </div>
                <div className="fan-support">
                  <DollarSign size={16} />
                  <span>${fan.supportAmount}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="upgrade-notice">
            <h3>Хотите видеть больше данных?</h3>
            <p>Перейдите на тариф KanyeWest-like для доступа к расширенной статистике</p>
            <button className="upgrade-btn">
              Upgrade до $4499/год
            </button>
          </div>
        </section>
      )}

      {selectedTab === 'locations' && (
        <section className="locations-section">
          <h2>География слушателей</h2>
          <div className="locations-list">
            {mockInsights.locations.map((location) => (
              <div key={location.country} className="location-item">
                <span className="country-name">{location.country}</span>
                <div className="location-bar">
                  <div 
                    className="location-fill" 
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
                <span className="country-percentage">{location.percentage}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedTab === 'sources' && (
        <section className="sources-section">
          <h2>Источники трафика</h2>
          <div className="sources-list">
            {mockInsights.sources.map((source) => (
              <div key={source.source} className="source-item">
                <span className="source-name">{source.source}</span>
                <div className="source-bar">
                  <div 
                    className="source-fill" 
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <span className="source-percentage">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="subscription-plans">
        <h2>Тарифы</h2>
        <div className="plans-grid">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.id === 'kanyewest-like' ? 'featured' : ''}`}>
              <h3>{plan.name}</h3>
              <div className="plan-price">
                {plan.price === 0 ? 'Бесплатно' : `${plan.price}₽/${plan.period === 'month' ? 'мес' : 'год'}`}
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className={`plan-btn ${plan.id === 'kanyewest-like' ? 'featured' : ''}`}>
                {plan.price === 0 ? 'Текущий' : 'Выбрать'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
