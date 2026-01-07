/*
  # Schema Completo - Dashboard de Gestão Política

  1. New Tables
    - `campaigns` - Campanhas/Planos de Campanha
    - `electoral_centers` - Centros Eleitorais
    - `leaders` - Líderes/Apoiadores
    - `activities` - Atividades
    - `electoral_surveys` - Pesquisas Eleitorais
    - `actions` - Ações
    - `improvements` - Melhorias
    - `documents` - Documentos
    - `messages` - Mensagens
    - `performance_metrics` - Métricas de Desempenho

  2. Security
    - Enable RLS em todas as tabelas
    - Políticas de acesso por usuário autenticado

  3. Relationships
    - campaigns belongs_to user
    - leaders, activities, surveys, actions pertencem a campaign
*/

CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
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

CREATE TABLE IF NOT EXISTS electoral_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  name text NOT NULL,
  location text,
  total_voters integer DEFAULT 0,
  visited boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
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

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  title text NOT NULL,
  description text,
  activity_type text,
  date timestamp with time zone,
  location text,
  responsible text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS electoral_surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  survey_name text NOT NULL,
  total_respondents integer DEFAULT 0,
  pending_respondents integer DEFAULT 0,
  completion_percentage integer DEFAULT 0,
  survey_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  title text NOT NULL,
  description text,
  priority text,
  status text DEFAULT 'pending',
  due_date timestamp with time zone,
  responsible text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS improvements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'proposed',
  impact_score integer,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  title text NOT NULL,
  document_type text,
  file_url text,
  uploaded_by text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  sender_id uuid REFERENCES auth.users,
  recipient_id uuid REFERENCES auth.users,
  subject text,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  metric_date date,
  votes_count integer DEFAULT 0,
  electoral_centers_visited integer DEFAULT 0,
  leaders_contacted integer DEFAULT 0,
  activities_completed integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE electoral_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE electoral_surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE improvements ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaigns
CREATE POLICY "Users can view own campaigns"
  ON campaigns FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own campaigns"
  ON campaigns FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for electoral_centers
CREATE POLICY "Users can view campaign centers"
  ON electoral_centers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = electoral_centers.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign centers"
  ON electoral_centers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = electoral_centers.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for leaders
CREATE POLICY "Users can view campaign leaders"
  ON leaders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = leaders.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign leaders"
  ON leaders FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = leaders.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for activities
CREATE POLICY "Users can view campaign activities"
  ON activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = activities.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = activities.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for electoral_surveys
CREATE POLICY "Users can view campaign surveys"
  ON electoral_surveys FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = electoral_surveys.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign surveys"
  ON electoral_surveys FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = electoral_surveys.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for actions
CREATE POLICY "Users can view campaign actions"
  ON actions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = actions.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign actions"
  ON actions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = actions.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for improvements
CREATE POLICY "Users can view campaign improvements"
  ON improvements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = improvements.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign improvements"
  ON improvements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = improvements.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for documents
CREATE POLICY "Users can view campaign documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = documents.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = documents.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for messages
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- RLS Policies for performance_metrics
CREATE POLICY "Users can view campaign metrics"
  ON performance_metrics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = performance_metrics.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage campaign metrics"
  ON performance_metrics FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = performance_metrics.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS campaigns_user_id_idx ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS electoral_centers_campaign_id_idx ON electoral_centers(campaign_id);
CREATE INDEX IF NOT EXISTS leaders_campaign_id_idx ON leaders(campaign_id);
CREATE INDEX IF NOT EXISTS activities_campaign_id_idx ON activities(campaign_id);
CREATE INDEX IF NOT EXISTS electoral_surveys_campaign_id_idx ON electoral_surveys(campaign_id);
CREATE INDEX IF NOT EXISTS actions_campaign_id_idx ON actions(campaign_id);
CREATE INDEX IF NOT EXISTS improvements_campaign_id_idx ON improvements(campaign_id);
CREATE INDEX IF NOT EXISTS documents_campaign_id_idx ON documents(campaign_id);
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_recipient_id_idx ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS performance_metrics_campaign_id_idx ON performance_metrics(campaign_id);