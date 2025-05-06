use anchor_lang::prelude::*;
declare_id!("G5VqRsSrsxv2GMMYiMpby6bpqfLFSkWEJWNqt6ZMwCgZ");

#[program]
pub mod blockshot_progrm{
    use super::*;
    pub fn initialize(ctx: Context<Initialize>,data:u64) -> Result<()>{
        let account = &mut ctx.accounts.data_account;
        account.value = data;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init,payer = user, space = 8 + 8)]
    pub data_account:Account<'info, DataAccount>,
    #[account(mut)]
    pub user:Signer<'info>,
    pub system_program:Program<'info, System>,

}

#[account]
pub struct DataAccount{
    pub value:u64,
}
