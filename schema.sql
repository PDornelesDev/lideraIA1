-- Política+ - Schema SQL Completo
-- Database: PostgreSQL
-- Descrição: Schema completo para sistema de gestão de campanhas políticas
-- Data de Criação: 2024

-- IMPORTANTE: Este arquivo é compatível com PostgreSQL puro
-- Algumas considerações para seu próprio banco de dados:
-- 1. Se usar Supabase, as funções auth.uid() funcionam automaticamente
-- 2. Se usar PostgreSQL próprio, você precisará:
--    - Criar tabela de usuários própria
--    - Ajustar as referências de user_id conforme necessário
--    - Remover ou adaptar as políticas RLS para seu sistema de autenticação

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Tabela: campaigns
-- Descrição: Campanhas/Planos de Campanha dos usuários
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  target_votes integer DEFAULT 0,
  current_votes integer DEFAULT 0,
  budget decimal(15,2) DEFAULT 0,
  status text DEFAULT 'active',
  start_date timestamp with time zone DEFAULT now(),
  end_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela: electoral_centers
-- Descrição: Centros eleitorais pertencentes a campanhas
CREATE TABLE IF NOT EXISTS electoral_centers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text,
  total_voters integer DEFAULT 0,
  visited boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: leaders
-- Descrição: Líderes/Apoiadores de campanhas
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  role text,
  zone text,
  status text DEFAULT 'active',
  votes_influenced integer DEFAULT 0,
  contact_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: activities
-- Descrição: Atividades da campanha
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  activity_type text,
  date timestamp with time zone,
  location text,
  responsible text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: electoral_surveys
-- Descrição: Pesquisas eleitorais
CREATE TABLE IF NOT EXISTS electoral_surveys (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  survey_name text NOT NULL,
  total_respondents integer DEFAULT 0,
  pending_respondents integer DEFAULT 0,
  completion_percentage integer DEFAULT 0,
  survey_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: actions
-- Descrição: Ações/Demandas a executar
CREATE TABLE IF NOT EXISTS actions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  priority text,
  status text DEFAULT 'pending',
  due_date timestamp with time zone,
  responsible text,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: improvements
-- Descrição: Sugestões de melhorias
CREATE TABLE IF NOT EXISTS improvements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text DEFAULT 'proposed',
  impact_score integer,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: documents
-- Descrição: Documentos da campanha
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title text NOT NULL,
  document_type text,
  file_url text,
  uploaded_by text,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: messages
-- Descrição: Mensagens entre usuários
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  subject text,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela: performance_metrics
-- Descrição: Métricas de desempenho da campanha
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  metric_date date,
  votes_count integer DEFAULT 0,
  electoral_centers_visited integer DEFAULT 0,
  leaders_contacted integer DEFAULT 0,
  activities_completed integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Índices para melhorar performance de queries
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_electoral_centers_campaign_id ON electoral_centers(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leaders_campaign_id ON leaders(campaign_id);
CREATE INDEX IF NOT EXISTS idx_activities_campaign_id ON activities(campaign_id);
CREATE INDEX IF NOT EXISTS idx_electoral_surveys_campaign_id ON electoral_surveys(campaign_id);
CREATE INDEX IF NOT EXISTS idx_actions_campaign_id ON actions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_improvements_campaign_id ON improvements(campaign_id);
CREATE INDEX IF NOT EXISTS idx_documents_campaign_id ON documents(campaign_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_campaign_id ON performance_metrics(campaign_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
-- IMPORTANTE: RLS é específico do Supabase
-- Se usar PostgreSQL próprio, você pode:
-- 1. Manter RLS desativado e controlar acesso na aplicação
-- 2. Criar sua própria tabela de usuários e ajustar as políticas
-- 3. Usar uma extensão de autenticação PostgreSQL

-- ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE electoral_centers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE electoral_surveys ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE improvements ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- DADOS DE EXEMPLO (OPCIONAL)
-- ============================================================================

-- Descomente o bloco abaixo para inserir dados de exemplo
/*
-- Inserir campanha de exemplo
INSERT INTO campaigns (user_id, name, description, target_votes, current_votes, budget, status)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000'::uuid,
  'Campanha 2024 - Região Sul',
  'Campanha para eleição municipal 2024 na região sul',
  1300,
  0,
  50000.00,
  'active'
);

-- Inserir líderes de exemplo
INSERT INTO leaders (campaign_id, name, role, zone, votes_influenced, status)
VALUES (
  (SELECT id FROM campaigns LIMIT 1)::uuid,
  'João Silva',
  'Coordenador Regional',
  'Zona Centro',
  150,
  'active'
);

-- Inserir atividades de exemplo
INSERT INTO activities (campaign_id, title, description, activity_type, status)
VALUES (
  (SELECT id FROM campaigns LIMIT 1)::uuid,
  'Reunião com Eleitores',
  'Reunião de mobilização com eleitores da região',
  'reuniao',
  'pending'
);
*/

-- ============================================================================
-- INSTRUÇÕES DE USO
-- ============================================================================
/*
1. CRIAR TABELA DE USUÁRIOS (se não usar Supabase):
   CREATE TABLE users (
     id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
     email text UNIQUE NOT NULL,
     password_hash text NOT NULL,
     created_at timestamp with time zone DEFAULT now()
   );

2. AJUSTAR FOREIGN KEYS:
   ALTER TABLE campaigns ADD CONSTRAINT fk_campaigns_user_id
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

3. CONTROLAR ACESSO:
   - Use a aplicação para validar que o usuário_id combina com a sessão autenticada
   - Ou implemente RLS personalizado para seu sistema de autenticação

4. BACKUP E RESTAURAÇÃO:
   - pg_dump -U username -h localhost dbname > backup.sql
   - psql -U username -h localhost dbname < backup.sql

5. MONITORAMENTO:
   - Monitore o tamanho das tabelas com: SELECT tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) FROM pg_tables;
   - Analise queries lentas com EXPLAIN ANALYZE
*/

-- ============================================================================
-- FIM DO SCHEMA
-- ============================================================================
