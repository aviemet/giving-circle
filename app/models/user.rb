# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  active                 :boolean          default(TRUE), not null
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  failed_attempts        :integer          default(0), not null
#  invitation_accepted_at :datetime
#  invitation_created_at  :datetime
#  invitation_limit       :integer
#  invitation_sent_at     :datetime
#  invitation_token       :string
#  invitations_count      :integer          default(0)
#  invited_by_type        :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  locked_at              :datetime
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  table_preferences      :jsonb
#  unconfirmed_email      :string
#  unlock_token           :string
#  user_preferences       :jsonb
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  invited_by_id          :uuid
#  person_id              :uuid
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_invitation_token      (invitation_token) UNIQUE
#  index_users_on_invited_by            (invited_by_type,invited_by_id)
#  index_users_on_invited_by_id         (invited_by_id)
#  index_users_on_person_id             (person_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_table_preferences     (table_preferences) USING gin
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#  index_users_on_user_preferences      (user_preferences) USING gin
#
# Foreign Keys
#
#  fk_rails_...  (person_id => people.id)
#
class User < ApplicationRecord
  resourcify
  rolify

  # :omniauthable, :timeoutable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :confirmable, :lockable, :trackable

  scope :includes_associated, -> { includes([:circles]) }

  belongs_to :person, optional: true

  validates :email, presence: true

  def circles
    Circle.with_roles(Circle.find_roles.pluck(:name), self)
  end

  # Per table query limit for pagination
  def limit(model)
    self.table_preferences&.[](model.to_s)&.[]('limit') || 25
  end
end
