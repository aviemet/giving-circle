module RequestMacros
  def login_admin(circle = nil)
    before do
      @admin = FactoryBot.create(:user)
      @admin.confirm
      @admin.add_role(:super_admin)
      @admin.add_role(:admin, circle || create(:circle))
      sign_in @admin
    end
  end

  def login_user(circle = nil)
    before do
      @user = FactoryBot.create(:user)
      @user.confirm
      @user.add_role(:admin, circle || create(:circle))
      sign_in @user
    end
  end
end
