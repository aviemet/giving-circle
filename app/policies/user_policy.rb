class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end

  def update_table_preferences?
    standard_auth(:update)
  end

  def update_user_preferences?
    standard_auth(:update)
  end
end
