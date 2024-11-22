class UserPolicy < ApplicationPolicy
  class Scope < Scope
  end

  def update_table_preferences?
    standard_auth(:update)
  end

  def update_user_preferences?
    standard_auth(:update)
  end
end
